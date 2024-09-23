import {useEffect, useMemo, useState} from "react";
import {request} from "@marvin/shared";

export const useDateTips = () => {
    const [editingId, setEditingId] = useState(undefined)
    const [datetipList, setDatetipList] = useState([]);
    const [datetipDetail, setDatetipDetail] = useState(null);

    const [filterModel, setFilterModel] = useState({
        searchInput: '',
        dateRange: [],
        tagIds: []
    });

    const fetchList = async () => {
        request({
            url: '/api/datetip'
        }).then(res => setDatetipList(res.data))
    }

    const handleDetail = ({id}) => {
        request({
            url: `/api/datetip/${id}`
        }).then(res => {
            setDatetipDetail(res.data)
        })
    }

    const handleDelete = async ({id}) => {
        request({
            url: `/api/datetip/${id}`,
            config: {
                method: 'delete'
            }
        }).then(res => {
            setEditingId(undefined)
            setDatetipDetail(undefined);
            fetchList()
        })
    }

    const handleSave = async (content) => {
        const res = await request({
            url: '/api/datetip',
            data: {...datetipDetail, content, summary: content.slice(0, 20)},
            config: {
                method: 'post',
            }

        });

        setEditingId(undefined);
        setDatetipDetail(res?.data);
        !datetipDetail?.id && fetchList();
    }

    useEffect(() => {
        fetchList()
    }, []);

    const isActive = useMemo(() => {
        return editingId || datetipDetail
    }, [editingId, datetipDetail]);

    const isFilter = useMemo(() => {
        return !isActive
    }, [isActive]);

    return {
        editingId,
        setEditingId,
        datetipList,
        setDatetipList,
        datetipDetail,
        setDatetipDetail,
        fetchList,
        handleDetail,
        handleDelete,
        handleSave,
        isActive,
        isFilter
    }
}