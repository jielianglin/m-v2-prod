import { useEffect } from 'react';

const useIntro = () => {

    const storage = window.localStorage;
    const currTimestamp = Date.now();
    const timestamp = JSON.parse(storage.getItem('timestamp') || '1000');

    // const timeLimit = 2 * 60 * 60 * 1000; // 2 hours

    const timeLimit = 60 * 1000; // 1 min

    const hasTimePassed = currTimestamp - timestamp > timeLimit;

    useEffect(() => {
        hasTimePassed ?
            storage.setItem('timestamp', currTimestamp.toString())
            :
            storage.setItem('timestamp', timestamp.toString());
    }, []);

    return hasTimePassed;
};

export default useIntro;