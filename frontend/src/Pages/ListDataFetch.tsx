import axios from 'axios'

export const ListDataFetch = async (setData: (data: any) => void, setLoader: (loader: boolean) => void, name: string) => {
    let link = ''
    // Production
    link = 'http://musicality.std-1578.ist.mospolytech.ru/api/' + name + '/'
    // Development
    // link = 'http://localhost:8000/api/' + name + '/'

    const response1 = await axios(
        link, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'duplexMismatch'
        },
        withCredentials: true,
    }
    )
    await setData(response1.data)
}