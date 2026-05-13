import useFetch from "../hooks/useFetch";
import type { Meal } from "../types";
import Error from "./Error";
import MealItem from "./MealItem";

const requestConfig: RequestInit = {};

export default function Meals() {

    const [fetchedMeals, isFetching, error] = useFetch<Meal[]>('http://localhost:3000/meals', [], requestConfig);

    if (isFetching) {
        return <p className="center">Loading meals...</p>
    }

    if (error) {
        return <Error title="Failed to load meals" message={error.message || 'Something went wrong, failed to load meals. Please try again later.'} />
    }

    return (
        <ul id="meals">
            {fetchedMeals!.map(meal => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>     
    )
}