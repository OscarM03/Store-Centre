import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import api from "../api";

const BillingForm = ({ totalWithShipping, shippingOption, items }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        county: "",
        town: "",
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleTermsChange = (event) => {
        setTermsAccepted(event.target.checked);
    };

    const formatPhoneNumber = (phone) => {
      if (phone.startsWith('0')) {
        return `254${phone.slice(1)}`; // Converts '0112163160' to '254112163160'
      }
      return phone;
    };

    const dataPostMutation = useMutation({
        mutationFn: async () => {
            if (!termsAccepted) {
                alert("You must agree to the terms and conditions before submitting.");
                throw new Error("Terms not accepted");
            }

            const data = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone_number: formatPhoneNumber(formData.phone),
                county: formData.county,
                town: formData.town,
                shipping_option: shippingOption,
                total_amount: totalWithShipping,
                items: items.map((item) => ({
                    product: item.product.id,
                    quantity: item.quantity,
                })),
            };
            console.log(data);

            const response = await api.post("api/v1/order/", data);
            return response.data;
        },
        onSuccess: (data) => {
            setMessage({ type: "success", text: "Order placed successfully!" });

            if (window.confirm("Order placed successfully! Do you want to proceed with payment?")) {
                paymentMutation.mutate(data);
            } else {
                navigate("/");
            }
        },
        onError: () => {
            setMessage({ type: "error", text: "Error placing order" });
        },
    });

    const paymentMutation = useMutation({
        mutationFn: async (data) => {
            const response = await api.post("api/v1/mpesa/stk_push/", {
                total_amount: totalWithShipping,
                phone_number: formatPhoneNumber(formData.phone),
            });
            return response.data;
        },
        onSuccess: () => {
            setMessage({ type: "success", text: "Payment processed successfully!" });
            setTimeout(() => {
                navigate("/");
            }, 5000);
        },
        onError: () => {
            setMessage({ type: "error", text: "Error processing payment" });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!shippingOption) {
            setMessage({ type: "error", text: "Please select a shipping option." });
            return;
        }

        dataPostMutation.mutate(); // Trigger the order mutation
    };

    const formatCurrency = (amount) => {
        return parseFloat(amount).toLocaleString("en-KE", {
            style: "currency",
            currency: "KES",
        });
    };

    return (
        <section className="container">
            <div className="mt-8 relative">
                <form className="rounded-md" onSubmit={handleSubmit}>
                    {["firstName", "lastName", "email", "phone", "county", "town"].map((field, idx) => (
                        <div key={idx} className="mb-4">
                            <label
                                htmlFor={field}
                                className="block text-xiaomi-color font-medium mb-2"
                            >
                                {field.replace(/^\w/, (c) => c.toUpperCase())}
                            </label>
                            <input
                                type={field === "email" ? "email" : "text"}
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md border-gray-400 bg-dark-bg text-gray-400 text-lg"
                                required
                            />
                        </div>
                    ))}

                    <div>
                        <p className="text-gray-400">
                            Please note that your personal information will be used to process your order, enhance your experience on our website, and fulfill other purposes outlined in our{" "}
                            <span className="text-blue-500 cursor-pointer ml-1">Privacy Policy</span>
                        </p>
                    </div>

                    <div className="my-4">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={termsAccepted}
                            onChange={handleTermsChange}
                            required
                        />
                        <label htmlFor="terms" className="ml-2 text-gray-400 font-medium">
                            I have read and agree to the
                            <span
                                className="text-blue-500 cursor-pointer ml-1"
                                onClick={() => setShowTermsModal(true)}
                            >
                                Terms and Conditions
                            </span>
                        </label>
                    </div>

                    <div className="mt-16 lg:absolute -bottom-16 -right-40 max-lg:text-center">
                        <Button
                            label={`Place Order (${formatCurrency(totalWithShipping)})`}
                            onClick={handleSubmit}
                        />
                    </div>

                    <div className="mt-6 lg:absolute -bottom-[90px] -right-[139px] max-lg:text-center">
                        {message.text && (
                            <div
                                className={message.type === "success" ? "text-green-500" : "text-red-500"}
                            >
                                {message.text}
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {showTermsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-dark-bg p-8 rounded-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4 text-xiaomi-color">Terms and Conditions</h2>
                        <div className="h-64 overflow-y-auto">
                            <p className="text-sm text-gray-300">
                                {/* Add terms and conditions text */}
                            </p>
                        </div>
                        <div className="mt-4 text-right">
                            <Button label="Close" onClick={() => setShowTermsModal(false)} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BillingForm;
