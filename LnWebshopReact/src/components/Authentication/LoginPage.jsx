import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginPage.css";
import z  from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../services/useServices";

const schema = z.object({
  email: z.string().email().min(7, "Email must be at least 7 characters long"),
  password: z.string().min(7, "Password must be at least 7 characters long")
});

const LoginPage = () => {
 
  const { register, handleSubmit, formState: {errors} } = useForm({resolver: zodResolver(schema)})
  const [error, setError] = useState(null)

  const onSubmit = async (formData) => {
    try {
      setError(null)
      await login(formData)
      window.location = "/"
    } catch (error) {
      
      setError(error.response.data.message)
    }
  }

  return (
    <section className="align_center form_page">
      <form action="" className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="form_text_input"
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter Your Email"
            />
            {errors.email ? <em className="form_error">{errors.email.message}</em> : null }
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="form_text_input"
              type="password"
              {...register("password")}
              placeholder="Enter Your Password"
            />
            {errors.password ? <em className="form_error">{errors.password.message}</em> : null }
          </div>
          {error && <em className="form_error"> {error} </em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
