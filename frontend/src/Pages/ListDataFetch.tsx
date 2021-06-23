import axios from 'axios'

export const ListDataFetch = async (setData: (data: any) => void, setLoader: (loader: boolean) => void, name: string) => {
    setLoader(true)

    let link = ''
    // Production
    link = 'http://musicality.std-1578.ist.mospolytech.ru/api/' + name + '/'
    // Development
    // link = 'http://localhost:8000/api/' + name + '/'

    const response1 = await axios(
        link, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    }
    )
    await setData(response1.data)
    setTimeout(() => {
        setLoader(false)
    }, 300);
}