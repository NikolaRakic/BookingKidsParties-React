import "../css/NotFound.css";
import Navigation from "../components/nav/Navigation";
export default function NotFoundPage(){

    return(
        <>
        <Navigation />
        <div className="not-found">
            <a href="/pocetna">Vratite se na početnu</a>
        </div>
        </>
    )
}