import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  HtmlHTMLAttributes,
  FormEvent,
} from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const GridMain = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-gap: 50px;

  padding: 30px 30px;

  min-width: 992px;

  aside {
    padding: 30px 30px;
    background: white;
    /* margin: 0 auto;
    width: 100%;
    min-width: 300px;
    text-align: center; */

    h3:first-of-type {
      color: #007bff;
      text-align: left;
      font-weight: bold;
    }

    h3 {
      min-width: 300px;
      text-align: left;
    }

    height: 20%;
  }

  div {
    display: grid;
    grid-template-columns: 1fr;
  }

  button {
    background: #007bff;
    color: white;
    padding: 10px;
    font-weight: bold;
    width: 200px !important;
  }
`;

const GridTemplateColums1fr = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: white;
  padding: 30px 30px;

  div {
    label:first-of-type {
      padding: 10px;
      margin-top: 3px;
      text-align: left;
    }
  }

  .library-choice {
    width: 100%;
  }

  input[type="radio"],
  input[type="checkbox"] {
    box-sizing: border-box;
    padding: 0;
    transform: scale(2);
    margin-left: 20px;
    margin-top: 20px;
  }

  .red {
    border-bottom: 3px solid red;
  }
  .red2 {
    border: 3px solid red !important;
  }
`;

const GroupInput = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  /* input[type="checkbox"] {
    border: 1px solid red;
  } */

  div {
    display: grid;
    grid-template-columns: 40px 1fr;

    label,
    input {
    }
  }
`;

interface User {
  id: string;
  name: string;
  img: string;
  username: string;
}

interface MyArr {
  name: string;
  check: boolean;
}

interface SelectProps {
  props: User;
}

const Dashboard: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const bioInputRef = useRef<HTMLTextAreaElement>(null);
  const primarySkillInputRef = useRef<HTMLSelectElement>(null);
  const libraryOfChoiceInputRef = useRef<HTMLInputElement>(null);
  const additionalExperienceInputRef = useRef<HTMLInputElement>(null);
  const [libraryChoice, setLibraryChoice] = useState<string>("");
  const [AdditionalExperience, setAdditionalExperience] = useState<string>("");
  const [firstError, setFirstError] = useState<string>("");
  const [secondError, setSecondError] = useState<string>("");
  const [thirdError, setThirdError] = useState<string>("");
  const [fourthError, setFourthError] = useState<string>("");
  const [fifthError, setFifthError] = useState<string>("");

  function handleSubmit(event: any) {
    let hasValidate = false;

    if (nameInputRef.current?.value.length != 0) {
      hasValidate = true;
      setFirstError("");

      if (bioInputRef.current?.value.length != 0) {
        hasValidate = true;
        setSecondError("");

        if (primarySkillInputRef.current?.value != "DEFAULT") {
          hasValidate = true;
          setThirdError("");

          if (libraryChoice.length != 0) {
            hasValidate = true;
            setFourthError("");

            if (AdditionalExperience.length != 0) {
              hasValidate = true;
              setFifthError("");
            } else {
              hasValidate = false;
              setFifthError("red");
            }

            if (hasValidate == true) {
              alert("APROVADO");
            }
          } else {
            hasValidate = false;

            setFourthError("red");
          }
        } else {
          hasValidate = false;

          setThirdError("red");
        }
      } else {
        hasValidate = false;

        setSecondError("red");
      }
    } else {
      hasValidate = false;
      setFirstError("red");
    }
  }

  function handleAdditionalExperience(event: any) {
    const target = event.target;
    const name = target.name;

    const arr = new Array<MyArr>();

    setAdditionalExperience(name);
  }

  function handleJavascriptLibraryOfChoice(event: any) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    const arr = new Array<MyArr>();

    setLibraryChoice(name);

    // libraryOfChoiceInputRef.current?.value = name;
  }

  const InputAdditionalExperience = () => (
    <GroupInput>
      <label
        className={`label-first ${fifthError != null ? fifthError : null}`}
      >
        Additional Experience
      </label>

      <div>
        <input
          type="checkbox"
          name={"TDD"}
          value={"TDD"}
          defaultChecked={AdditionalExperience === "TDD"}
          ref={additionalExperienceInputRef}
          onClick={handleAdditionalExperience}
        />
        <label>TDD</label>
      </div>
      <div>
        <input
          type="checkbox"
          name={"Heroku"}
          value={"Heroku"}
          defaultChecked={AdditionalExperience === "Heroku"}
          ref={additionalExperienceInputRef}
          onClick={handleAdditionalExperience}
        />
        <label>Heroku</label>
      </div>
      <div>
        <input
          type="checkbox"
          name={"Github"}
          value={"Github"}
          defaultChecked={AdditionalExperience === "Github"}
          ref={additionalExperienceInputRef}
          onClick={handleAdditionalExperience}
        />
        <label>Github</label>
      </div>
    </GroupInput>
  );

  const JavascriptLibraryOfChoice = () => (
    <GroupInput>
      <label className={` ${fourthError != null ? fourthError : null}  `}>
        Javascript library of choice
      </label>
      <div>
        <input
          type="radio"
          name={"javascript"}
          value={"javascript"}
          defaultChecked={libraryChoice === "javascript"}
          onClick={handleJavascriptLibraryOfChoice}
        />
        <label>Javascrip</label>
      </div>
      <div>
        <input
          type="radio"
          name={"angular"}
          value={"angular"}
          defaultChecked={libraryChoice === "angular"}
          onClick={handleJavascriptLibraryOfChoice}
        />
        <label>Angular</label>
      </div>
      <div>
        <input
          type="radio"
          name={"vue"}
          value={"vue"}
          defaultChecked={libraryChoice === "vue"}
          onClick={handleJavascriptLibraryOfChoice}
        />
        <label>Vue</label>
      </div>
    </GroupInput>
  );

  return (
    <GridMain>
      <aside>
        <h3>Pipefy Recruitment test</h3>
        <h3>Recruitment Survey</h3>
      </aside>
      <GridTemplateColums1fr>
        <div>
          <label
            htmlFor="name"
            className={`${firstError != null ? firstError : null}`}
          >
            Your name
          </label>
          <input id="name" className="form-control" ref={nameInputRef} />
        </div>
        <div>
          <label
            htmlFor="bio"
            className={` ${secondError != null ? secondError : null}  `}
          >
            Your bio
          </label>
          <textarea
            id="bio"
            name="textarea"
            placeholder="Comment text."
            cols={20}
            ref={bioInputRef}
            rows={3}
          />
        </div>
        <div>
          <label
            htmlFor="selected"
            className={` ${thirdError != null ? thirdError : null}  `}
          >
            Primary skill
          </label>
          <div className="form-group">
            <select
              className="form-control"
              defaultValue={"DEFAULT"}
              ref={primarySkillInputRef}
            >
              <option value="DEFAULT" disabled className={`   form-group `}>
                -- select an option --
              </option>
              <option>Javascript</option>
              <option>Node JS</option>
              <option>Typescript</option>
              <option>C#</option>
              <option>Python</option>
            </select>
          </div>
        </div>
        <div>
          <JavascriptLibraryOfChoice />
        </div>
        <div>
          <InputAdditionalExperience />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </GridTemplateColums1fr>
    </GridMain>
  );
};

export default Dashboard;
