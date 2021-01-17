import React from 'react'
import {useQuery, gql} from '@apollo/client'


const getBooksQuery = gql`
 {
     books{
         name
         genre
         author{
             name
             age
         }
     }
 }
`

const BookList = () => {

    const {loading, error, data} = useQuery(getBooksQuery)

    return (
        <div>
            <h1>BookList</h1>
            {data.books.map((name, genre, i) => (
                <div key={i}>
                    <p>
                        {name}
                        {genre}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default BookList
