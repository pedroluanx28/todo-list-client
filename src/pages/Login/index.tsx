import { useFormik } from "formik"
import { api } from "../../Api";

export function Login() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const { data } = await api.post('/login', values);
                
                localStorage.setItem("token", data.token);

                location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-2 align-items-center pt-5">
                <input type="text" {...formik.getFieldProps("email")} className="form-control w-25" placeholder="E-mail" />
                <input type="password" {...formik.getFieldProps("password")} className="form-control w-25" placeholder="Senha" />

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success">Logar</button>
                    <a href="/register">
                        <button type="button" className="btn btn-light">Criar conta</button>
                    </a>
                </div>
            </form>
        </>
    )
}