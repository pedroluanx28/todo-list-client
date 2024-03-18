import { useFormik } from "formik"
import { api } from "../../Api"
import { useNavigate } from "react-router-dom";

export function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                await api.post('/register', values);

                const { data } = await api.post('/login', {
                    email: values.email,
                    password: values.password,
                });

                localStorage.setItem("token", data.token);

                location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-2 align-items-center pt-5">
            <input type="text" {...formik.getFieldProps("name")} className="form-control w-25" placeholder="Nome de usuário" />
            <input type="text" {...formik.getFieldProps("email")} className="form-control w-25" placeholder="E-mail" />
            <input type="password" {...formik.getFieldProps("password")} className="form-control w-25" placeholder="Senha" />

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">Criar</button>
                <a href="/login">
                    <button type="button" className="btn btn-light">Já tenho conta</button>
                </a>
            </div>
        </form>
    )
}