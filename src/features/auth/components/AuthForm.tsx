import {type FC} from "react";
import {Link} from "react-router";
import {Button, Col, Form, Text} from "@/components/atoms";
import {FormField} from "@/components/molecules";
import useAuthForm from "../hooks/useAuthForm";
import useConditionalText from "../hooks/useConditionalText";

export interface AuthFormProps {
  isSignUp?: boolean;
}

const AuthForm: FC<AuthFormProps> = (props) => {
  const {handleChange, handleSubmit, loading, error} = useAuthForm(props);
  const {title, directTitle, directRoute, directText} =
    useConditionalText(props);

  return (
    <Form onSubmit={handleSubmit}>
      <Col className="items-center gap-1">
        <Text size="md" weight="extrabold" className="tracking-tight">
          {title}
        </Text>
        <Text color="base-60" size="sm">
          Manage your finances better with UangKu.
        </Text>
      </Col>
      {props.isSignUp && <FormField name="name" onChange={handleChange} />}

      <FormField name="email" type="email" onChange={handleChange} />

      <FormField name="password" type="password" onChange={handleChange} />

      <Button className="w-full font-extrabold" loading={loading}>
        {title}
      </Button>

      {error && <Text className="text-red-500">{error}</Text>}
      <Text color="base-60" size="sm">
        {directText}{" "}
        <Link
          to={directRoute}
          className="text-base-content/60 font-semibold underline transition-all"
        >
          {directTitle}
        </Link>
      </Text>
    </Form>
  );
};

export default AuthForm;
