export default function LoggedInPostReview() {
    let formatRating = (rating) => {
        let num = rating.toString()
        if (num.length === 3) return num
        if (num.length === 1) return `${num}.0`
        if (num.length > 3) return `${num[0]}.${num[2]}`
    }

    return (
        <div></div>
    )
}