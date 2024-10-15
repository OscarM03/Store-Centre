import { Note13Pro, Pad6, Pocox4, Redmi12, RedmiNote13, RedmiPad, RedmiWatch, Storage } from "../constants";

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh"

export const baseUrl = "http://localhost:8000"


export const Filters = ["Redmi", "Poco", "Mi Phones", "watches", "Audio", "Screens", "Tablets", "Accessories"];

export const FeaturesList = [
    {
        icon: Storage,
        iconbg: 'bg-icon-color1',
        features: 'RAM 6GB | 8GB',
        xalign: 'left-[67%]',
        top: 'top-0',
        smalign: 'max-md:left-[57%]',

    },
    {
        icon: Storage,
        iconbg: 'bg-icon-color2',
        features: '128GB, 256GB',
        xalign: 'left-[72%]',
        top: 'top-28',
        smalign: 'max-md:left-[57%]',
        smtop: 'max-sm:top-[90px]'
    },
    {
        icon: Storage,
        iconbg: 'bg-icon-color3',
        features: 'Battery 500mah',
        xalign: 'left-[67%]',
        top: 'top-56',
        smalign: 'max-md:left-[57%]',
        smtop: 'max-sm:top-[180px]'
    },
    {
        icon: Storage,
        iconbg: 'bg-icon-color4',
        features: 'MainCamera 64MP',
        xalign: 'left-[72%]',
        top: 'top-[336px]',
        smalign: 'max-md:left-[57%]',
        smtop: 'max-sm:top-[270px]'
    },
    {
        icon: Storage,
        iconbg: 'bg-icon-color1',
        features: 'Front Camera 16MP',
        xalign: 'left-[67%]',
        top: 'top-[448px]',
        smalign: 'max-md:left-[57%]',
        smtop: 'max-sm:top-[360px]'
    },
    {
        icon: Storage,
        iconbg: 'bg-icon-color2',
        features: '6.67 Inches Display',
        xalign: 'left-[18%]',
        top: 'top-0',
        smalign: 'max-md:left-[3%]'
    },
    {
        icon: Storage,
        iconbg: 'bg-icon-color3',
        features: 'MediaTek Processor',
        xalign: 'left-[10%]',
        top: 'top-28',
        smalign: 'max-md:left-[3%]',
        smtop: 'max-sm:top-[90px]'
    },
    {
        icon: Storage,
        iconbg: 'bg-icon-color4',
        features: '5G Connectivity',
        xalign: 'left-[18%]',
        top: 'top-56',
        smalign: 'max-md:left-[3%]',
        smtop: 'max-sm:top-[180px]'
    },
    {
        icon: Storage,
        iconbg: 'bg-icon-color1',
        features: 'Blur, Silver, Black',
        xalign: 'left-[10%]',
        top: 'top-[336px]',
        smalign: 'max-md:left-[3%]',
        smtop: 'max-sm:top-[270px]'
    },
    {
        icon: Storage,
        iconbg: 'bg-icon-color2',
        features: 'Android 12 OS',
        xalign: 'left-[18%]',
        top: 'top-[448px]',
        smalign: 'max-md:left-[3%]',
        smtop: 'max-sm:top-[360px]'
    },
]

export const ProductsList = [
    {
        image: Note13Pro,
        category: 'SmartPhone',
        name: 'Redmi Note 13 Pro',
        price: 'Ksh 45,000',
        original: 'Ksh 55,000'
    },
    {
        image: RedmiNote13,
        category: 'SmartPhone',
        name: 'Redmi Note 13',
        price: 'Ksh 22,000',
        original: 'Ksh 35,000'
    },
    {
        image: Redmi12,
        category: 'SmartPhone',
        name: 'Redmi 12',
        price: 'Ksh 17,000',
        original: 'Ksh 25,000'
    },
    {
        image: Note13Pro,
        category: 'SmartPhone',
        name: 'Redmi Note 13 Pro',
        price: 'Ksh 45,000',
        original: 'Ksh 55,000'
    },
    {
        image: Pocox4,
        category: 'SmartPhone',
        name: 'Xiaomi Poco X4',
        price: 'Ksh 75,000',
        original: 'Ksh 95,000'
    },
    {
        image: Note13Pro,
        category: 'SmartPhone',
        name: 'Redmi Note 13 Pro',
        price: 'Ksh 45,000',
        original: 'Ksh 55,000'
    },
    {
        image: Note13Pro,
        category: 'SmartPhone',
        name: 'Redmi Note 13 Pro',
        price: 'Ksh 45,000',
        original: 'Ksh 55,000'
    },
    {
        image: RedmiNote13,
        category: 'SmartPhone',
        name: 'Redmi Note 13',
        price: 'Ksh 22,000',
        original: 'Ksh 35,000'
    },
    {
        image: Redmi12,
        category: 'SmartPhone',
        name: 'Redmi 12',
        price: 'Ksh 17,000',
        original: 'Ksh 25,000'
    },
    {
        image: Note13Pro,
        category: 'SmartPhone',
        name: 'Redmi Note 13 Pro',
        price: 'Ksh 45,000',
        original: 'Ksh 55,000'
    },
    {
        image: Pocox4,
        category: 'SmartPhone',
        name: 'Xiaomi Poco X4',
        price: 'Ksh 75,000',
        original: 'Ksh 95,000'
    },
    {
        image: Note13Pro,
        category: 'SmartPhone',
        name: 'Redmi Note 13 Pro',
        price: 'Ksh 45,000',
        original: 'Ksh 55,000'
    },
]
export const WatchesList = [
    {
        image: RedmiWatch,
        category: 'Watches',
        name: 'Xiaomi Watch 9X',
        price: 'Ksh 9,500',
        original: 'Ksh 12,000'
    },
    {
        image: RedmiWatch,
        category: 'Watches',
        name: 'Xiaomi Watch 9X',
        price: 'Ksh 9,500',
        original: 'Ksh 12,000'
    },
    {
        image: RedmiWatch,
        category: 'Watches',
        name: 'Xiaomi Watch 9X',
        price: 'Ksh 9,500',
        original: 'Ksh 12,000'
    },
    {
        image: RedmiWatch,
        category: 'Watches',
        name: 'Xiaomi Watch 9X',
        price: 'Ksh 9,500',
        original: 'Ksh 12,000'
    },
    {
        image: RedmiWatch,
        category: 'Watches',
        name: 'Xiaomi Watch 9X',
        price: 'Ksh 9,500',
        original: 'Ksh 12,000'
    },
    {
        image: RedmiWatch,
        category: 'Watches',
        name: 'Xiaomi Watch 9X',
        price: 'Ksh 9,500',
        original: 'Ksh 12,000'
    },
    {
        image: RedmiWatch,
        category: 'Watches',
        name: 'Xiaomi Watch 9X',
        price: 'Ksh 9,500',
        original: 'Ksh 12,000'
    },
    {
        image: RedmiWatch,
        category: 'Watches',
        name: 'Xiaomi Watch 9X',
        price: 'Ksh 9,500',
        original: 'Ksh 12,000'
    },
]

export const TabletsList = [
    {
        name: 'Xiaomi Pad 6',
        image: Pad6,
        f_1: '6GB, 8GB RAM',
        f_2: 'Snapdragon 870 5G',
        f_3: 'Li-Po 8840mAh, 33W',
        price: 'Ksh 49,000',
        original: 'Ksh 60,000'
    },
    {
        name: 'Redmi Pad SE',
        image: RedmiPad,
        f_1: '6GB, 8GB RAM',
        f_2: 'MediaTek Helio G99',
        f_3: '8000mAh, 33W',
        price: 'Ksh 33,900',
        original: 'Ksh 54,000'
    },
    {
        name: 'Xiaomi Pad 6',
        image: Pad6,
        f_1: '6GB, 8GB RAM',
        f_2: 'Snapdragon 870 5G',
        f_3: 'Li-Po 8840mAh, 33W',
        price: 'Ksh 49,000',
        original: 'Ksh 60,000'
    },
    {
        name: 'Redmi Pad SE',
        image: RedmiPad,
        f_1: '6GB, 8GB RAM',
        f_2: 'MediaTek Helio G99',
        f_3: '8000mAh, 33W',
        price: 'Ksh 33,900',
        original: 'Ksh 54,000'
    },
    {
        name: 'Xiaomi Pad 6',
        image: Pad6,
        f_1: '6GB, 8GB RAM',
        f_2: 'Snapdragon 870 5G',
        f_3: 'Li-Po 8840mAh, 33W',
        price: 'Ksh 49,000',
        original: 'Ksh 60,000'
    },
    {
        name: 'Redmi Pad SE',
        image: RedmiPad,
        f_1: '6GB, 8GB RAM',
        f_2: 'MediaTek Helio G99',
        f_3: '8000mAh, 33W',
        price: 'Ksh 33,900',
        original: 'Ksh 54,000'
    }
]