"use client";
import { signin } from "@/actions/signin";
import { useGlobal } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row
} from "react-bootstrap";

export default function Login() {
  const { setIsLoading, loadUserData } = useGlobal();
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  const handleSubmit = async (formInput: FormData) => {
    setFeedback("");
    const input: { [key: string]: string } = {};
    formInput.forEach((v, k) => (input[k] = v as string));
    const { username, password } = input;
    setIsLoading(true);
    const { ok, msg } = await signin(username, password);
    if (ok) {
      loadUserData();
      router.push("/");
    } else {
      setFeedback(msg);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Form action={handleSubmit}>
        <FormGroup as={Row} className="mb-3" controlId="formUsername">
          <FormLabel column sm="2">
            Username
          </FormLabel>
          <Col sm="10">
            <FormControl
              type="text"
              name="username"
              placeholder="<username>"
              required={true}
            />
          </Col>
        </FormGroup>
        <FormGroup as={Row} className="mb-3" controlId="formPassword">
          <FormLabel column sm="2">
            Password
          </FormLabel>
          <Col sm="10">
            <FormControl type="password" name="password" required={true} />
          </Col>
        </FormGroup>
        {feedback && <p className="text-danger">{feedback}</p>}
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}
