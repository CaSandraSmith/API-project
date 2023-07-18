import { useHistory } from "react-router-dom"
import "./PageNotFound.css"

export default function PageNotFound() {
    const history = useHistory()
    return (
        <div className="page-not-found-wrapper">
            <h1>Uh no ... we can't find the page that you're looking for</h1>
            <button onClick={() => history.push("/")}>Home</button>
        </div>
    )
}