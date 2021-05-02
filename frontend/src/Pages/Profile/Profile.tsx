import React, { useState, useEffect } from 'react';

interface datas {
    id: any,
    email: string,
    username: string,
    avatar: any,
    date_joined: string,
}

const Profile = () => {
    const [data, setData] = useState<datas>({ id: '', email: '', username: '', avatar: '', date_joined: '', })
    const [avatarLink, setAvatarLink]: any = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(
                'http://localhost:8000/user/profile', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }
            )
            const content = await response1.json()

            if (response1.status === 200) {
                await setData(content)
                if (typeof (data.avatar) !== 'object') {
                    // production
                    // await setAvatarLink(data.avatar)

                    // development
                    let link = "http://localhost:8000/" + data.avatar
                    await setAvatarLink(link)
                } else {
                    let link = "http://localhost:8000/media/images/users_avatars/d1zero.jpg"
                    await setAvatarLink(link)
                }
            } else {
                console.log(222)
            }
        }
        fetchData()
    }, [data.date_joined, data.avatar])


    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            {data.id ?
                <div>
                    Никнейм: {data.username}<br />
                    Email: {data.email}<br />
                    Аватар профиля: <img src={avatarLink} alt={data.username} /><br />
                    Дата регистрации: {data.date_joined.split('T')[0].toString()}
                </div>
                : <h1>Вы не авторизованы</h1>
            }
        </div>
    );
}

export default Profile;