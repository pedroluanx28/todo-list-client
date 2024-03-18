import { useFormik } from 'formik';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { api } from '../../Api';
import * as Yup from 'yup';

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
            priority: '',
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required("O título da tarefa é obrigátorio."),
            priority: Yup.string().required("Escolha uma prioridade."),
        }),
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
        <Modal size="lg" show={show} onHide={handleCloseModal}>
            <Modal.Header className="fw-semibold" closeButton>
                Adicionar nova tarefa
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <div className="d-flex flex-column gap-3">
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            placeholder="Título da tarefa"
                            name="title"
                            onChange={formik.handleChange}
                            autoFocus
                        />

                        {formik.errors.title && formik.touched.title && (
                            <span className="text-danger">{formik.errors.title}</span>
                        )}

                        <div>
                            <span>Prioridade: </span>

                            <div className="d-flex gap-3">
                                <div className="d-flex gap-2 align-items-center">
                                    <input type="radio" id="without-priority" name="priority" value="1" onChange={formik.handleChange} />
                                    <label htmlFor="without-priority" className="grey-label">Sem prioridade</label>
                                </div>

                                <div className="d-flex gap-2 align-items-center">
                                    <input type="radio" id="medium" name="priority" value="2" onChange={formik.handleChange} />
                                    <label htmlFor="medium" className="green-label">Média</label>
                                </div>

                                <div className="d-flex gap-2 align-items-center">
                                    <input type="radio" id="important" name="priority" value="3" onChange={formik.handleChange} />
                                    <label htmlFor="important" className="yellow-label">Importante</label>
                                </div>

                                <div className="d-flex gap-2 align-items-center">
                                    <input type="radio" id="very-important" name="priority" value="4" onChange={formik.handleChange} />
                                    <label htmlFor="very-important" className="red-label">Muito importante</label>
                                </div>
                            </div>
                            {formik.errors.priority && formik.touched.priority && (
                                <span className="text-danger">{formik.errors.priority}</span>
                            )}
                        </div>

                        <div className="text-end">
                            <button className="btn add-task-btn" type="submit">Adicionar</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}