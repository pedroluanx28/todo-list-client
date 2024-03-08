import { useFormik } from 'formik';

import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa";

import { api } from '../../Api';

type Props = ModalProps & {
    show: boolean;
    handleCloseModal: () => void;
    fetchTasks: () => void;
}

export function NewTaskModal({
    show,
    handleCloseModal,
    fetchTasks,
}: Props) {
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit: async (values) => {
            try {
                await api.post('/todos', values);

                handleCloseModal();

                fetchTasks();
            } catch (error: any) {
                console.error(error.message)
            }
        }
    });

    return (
        <Modal show={show} onHide={handleCloseModal}>
            <Modal.Header className="fw-semibold" closeButton>
                Adicionar nova tarefa
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            placeholder="Título da tarefa"
                            name="title"
                            onChange={formik.handleChange}
                            autoFocus
                            required
                        />

                        <button className="btn add-task-btn" type="submit"><FaPlus /></button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}