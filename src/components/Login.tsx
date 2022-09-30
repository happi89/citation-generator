import { signIn } from "next-auth/react";
const Login = ({}) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <button
        className="btn btn-primary"
        onClick={() => {
          signIn("discord");
        }}
      >
        Login with Discord
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          signIn("google");
        }}
      >
        Login with Google
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          signIn("github");
        }}
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;
