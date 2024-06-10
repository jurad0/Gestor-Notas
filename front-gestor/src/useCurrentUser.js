import { useState, useEffect } from 'react';

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return currentUser;
};
