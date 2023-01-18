import React from 'react';
import { useGetUsersQuery } from '../services/user';

export const Friends = () => {
    const { data } = useGetUsersQuery('');

    return (
        <div>
            {data?.map(({ email, id }) => (
                <div key={id}>{email}</div>
            ))}
        </div>
    );
};
