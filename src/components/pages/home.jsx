import { useState } from "react";
import CodeImage from "../../assets/code.jpg";
import { useProfile } from "../context/user";
import { Button, Card, Input, Label } from "../UI/atoms";
import { AnalysisPanel, GuessPanel, ProfilePanel } from "../UI/organisms";
import { InputGroup, Load } from "../UI/molecules";
import { Pie } from "../UI/atoms/charts";

function Home() {
  const { setUsername, profile, loading, error } = useProfile();
  const [userInput, setUserInput] = useState("");

  const handleOnChange = (evt) => {
    const value = evt.currentTarget.value;
    setUserInput(value);
  };

  const submit = () => {
    setUsername(userInput);
  };

  return (
    <>
      <Card.Card>
        <Card.Image url={CodeImage} />
        <Card.Body>
          <Card.Title>Git Guess</Card.Title>
          <Card.Description>
            <InputGroup>
              <Label>Enter GitHub Username</Label>
              <Input
                type="text"
                onEnterPress={submit}
                value={userInput}
                onChange={handleOnChange}
              />
              <Button className="ml-3" onClick={submit}>
                Submit
              </Button>
            </InputGroup>
            <Load error={error} loading={loading}>
              {profile && (
                <div className="py-4">
                  <p className="italic pb-3">You have selected to play with:</p>
                  <ProfilePanel />
                  <GuessPanel />
                </div>
              )}
            </Load>
          </Card.Description>
        </Card.Body>
      </Card.Card>
    </>
  );
}

export default Home;
