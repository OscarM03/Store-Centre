
import Button from "./Button"


const Filter = () => {
  const filters = ["Phones", "Screens", "Tablets"];
    return (
        <div className="flex justify-center items-center gap-4 max-sm:flex-col mt-10">
          <div>
              <a href="/all" ><Button label="All Products" /></a>
          </div>
          <div className="flex gap-4">
            {filters.map((filter) => (
              <a href={`/all?q=${encodeURIComponent(filter)}`} key={filter}>
                <Button key={filter} label={filter} />
              </a>
            ))}
          </div>
          <div>
            <a href={`/all?q=${encodeURIComponent('accessories')}`}><Button label="Accessories" /></a>
          </div>
        </div>
    )
}

export default Filter
