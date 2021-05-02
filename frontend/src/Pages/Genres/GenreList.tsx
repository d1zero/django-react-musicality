import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const GenreList = () => {
    const [data, setData]: any[] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                `http://localhost:8000/api/genres/`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )

            await setData(response1.data)
        }
        fetchData()
    }, [])

    interface obj {
        id: number,
        name: string,
        description: string,
    }


    return (
        <div>
            <br /><br /><br /><br />
            <h1>Все жанры</h1>
            <ol>
                {data.map((genre: obj) => {
                    console.log(genre);
                    return (
                        <li key={genre.id}>
                            <h2><Link to={"/genre/" + genre.id}>{genre.name}</Link></h2>
                            <textarea readOnly>{genre.description}</textarea>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default GenreList;