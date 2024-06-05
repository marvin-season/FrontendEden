import {useEffect} from 'react';
import {useRemark} from 'react-remark';

export const ReactRemarkMD = () => {
    const [reactContent, setMarkdownSource] = useRemark({
        remarkPlugins: []
    });

    useEffect(() => {
        setMarkdownSource('# markdown header');
    }, []);

    return reactContent;
};

