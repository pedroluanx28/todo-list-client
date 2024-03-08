import { useEffect, useState } from 'react';
import { NewTaskModal } from '../../Modals/NewTaskModal';
import { FaPlus } from "react-icons/fa";
import { Task } from '../../@types/task';
import { api } from '../../Api';
import { FaRegTrashCan } from "react-icons/fa6";
import InfiniteScroll from 'react-infinite-scroll-component';

import './styles.css';

export function Home() {
    const [tasks, setTasks] = useState([] as Task[]);
    const [paginate, setPaginate] = useState<any>();
    const [page, setPage] = useState(1);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);

    const nextId = tasks[tasks.length - 2]?.id + 1;

    const handleShowNewTaskModal = () => setShowNewTaskModal(true);
    const handleCloseNewTaskModal = () => setShowNewTaskModal(false);

    async function fetchTasks() {
        try {
            const { data } = await api.get('/todos', {
                params: {
                    page: page
                }
            });

            const formattedData = tasks.concat(data.data);

            setTasks(removeDuplicates(formattedData));

            setPaginate(data);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    async function updateCheckList(taskId: number, checked: boolean) {
        try {
            await api.put(`/todos/${taskId ? taskId : nextId}`, {
                checked: !checked,
            });

            setTasks(tasks.map(task => {
                if (taskId === task.id) {
                    return {
                        ...task,
                        checked: !checked,
                    }
                } else {
                    return task;
                }
            }));
        } catch (error: any) {
            console.error(error.message);
        }
    }

    async function handleDeleteCheckList(taskId: number) {
        try {
            await api.delete(`/todos/${taskId}`);

            setTasks(tasks.filter(task => taskId !== task.id));
        } catch (error) {
            console.error(error);
        }
    }

    function removeDuplicates(inArray: Task[]) {
        let arr = inArray.concat()
        for (let i = 0; i < arr.length; ++i) {
            for (let j = i + 1; j < arr.length; ++j) {
                if (arr[i].id === arr[j].id) {
                    arr.splice(j, 1);
                }
            }
        }
        return arr;
    }

    useEffect(() => {
        fetchTasks();
    }, [page]);

    return (
        <div className="container-fluid py-3">
            <button className="btn add-task-btn mb-3" onClick={handleShowNewTaskModal}><FaPlus /> Nova tarefa</button>

            {tasks.length < 1 ? (
                <div className="d-flex justify-content-center">
                    Nenhuma tarefa por aqui 😀
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={tasks.length || 0}
                    hasMore={paginate?.last_page > paginate?.current_page || false}
                    next={() => setPage(page + 1)}
                    loader={<>Carregando...</>}

                >
                    <div className="d-flex flex-column gap-3 align-items-center py-2">
                        {tasks?.map((task, index) => (
                            <div className={`d-flex align-items-center task-card justify-content-between ${task.checked && 'bg-grey'}`} key={`task-${index}`}>
                                <div className={`d-flex align-items-center gap-2 ${task.checked && 'text-decoration-through'}`}>
                                    <input type="checkbox" className="form-check-input m-0" checked={task.checked} onChange={() => updateCheckList(task.id, task.checked)} />
                                    <label>{task.title}</label>
                                </div>
                                <button className="btn" onClick={() => handleDeleteCheckList(task.id)}><FaRegTrashCan /></button>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            )}

            <NewTaskModal
                show={showNewTaskModal}
                handleCloseModal={handleCloseNewTaskModal}
                fetchTasks={fetchTasks}
            />
        </div>
    )
}