import axios from 'axios'

export const searchDataFetch = async (setData: (data: any) => void, typeOfInfo: any, query: string) => {
    if (query !== '') {
        let link = ''
        // Production
        link = 'http://musicality.std-1578.ist.mospolytech.ru/api/' + typeOfInfo + '-search/?search=' + query
        // Development
        // link = 'http://localhost:8000/api/' + typeOfInfo + '-search/?search=' + query

        axios.get(
            link, {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'duplexMismatch' },
            withCredentials: true
        }
        ).then(response => {
            if (response.data.message !== 'not found') {
                setData(response.data)
            } else {
                setData([{
                    "id": 0,
                }])
            }
        })
    } else {
        setData('')
    }
}