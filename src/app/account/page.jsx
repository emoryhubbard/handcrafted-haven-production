import Header from '../components/header'
import Footer from '../components/footer'
import { getParam } from '../components/utils.mjs'
import { getIronSession } from 'iron-session'

export default function Account() {
    return (
        <>
        <title>Sign In</title>
            <Header />
                <main>
                <p>Please Sign In:</p>
                <form
                    className="blue-form login-form"
                    action="/submitlogin"
                    method="post"
                    >
                    <fieldset className="login-form-fieldset">
                        <label className="block">
                        Email<span className="asterisk">*</span>
                        <input className="block border-2 border-black" type="email" name="email" required="" placeholder="" />
                        </label>
                        <label className="block" title="Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character">
                        Password<span className="asterisk">*</span>
                        <input
                            className="password-input block border-2 border-black"
                            type="password"
                            name="password"
                            title="Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character"
                            required=""
                            pattern="(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                            placeholder=""
                        />
                        <span>
                            Passwords must be at least 8 characters and contain at least 1 number, 1
                            capital letter and 1 special character
                        </span>
                        </label>
                        <input className="submit-button block cursor-pointer p-4 border-2 border-black" type="submit" defaultValue="Sign in" />
                        <label className="no-account block">
                        No account?{" "}
                        <a className="block p-4 border-2 border-black" href="/register">Sign up</a>
                        </label>
                        <input type="hidden" name="action" defaultValue="submit-login" />
                    </fieldset>
                    </form>
                </main>
            <Footer />
        </>
    )}