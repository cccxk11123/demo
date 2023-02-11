import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { useEffect, useState } from "react";
import { Button, Select } from "antd";
import "./codemirror.scss";

function CodeEditor() {
  const [code, SetCode] = useState("");
  const [seleted, SetSleted] = useState("");
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    //console.log("value:", value);
    SetCode(value);
  }, []);

  function submitCode(code: any) {
    //TODO提交代码
  }

  const handleChange = (status: string) => {
    SetSleted(status);
    //console.log(status);
  };

  if (seleted === "java") {
    return (
      <>
        <Select
          defaultValue="cpp"
          style={{ width: 100 }}
          onChange={handleChange}
          options={[
            { value: "java", label: "java" },
            { value: "cpp", label: "cpp" },
            { value: "python", label: "python" },
            { value: "javascript", label: "javascript" },
          ]}
        />
        <div className="codeEditor">
          <CodeMirror
            value={code}
            height="300px"
            extensions={[java()]}
            onChange={onChange}
          />
          <Button className="submit" onClick={submitCode}>
            提交代码
          </Button>
        </div>
      </>
    );
  } else if (seleted === "cpp") {
    return (
      <>
        <Select
          defaultValue="cpp"
          style={{ width: 100 }}
          onChange={handleChange}
          options={[
            { value: "java", label: "java" },
            { value: "cpp", label: "cpp" },
            { value: "python", label: "python" },
            { value: "javascript", label: "javascript" },
          ]}
        />
        <div className="codeEditor">
          <CodeMirror
            value={code}
            height="300px"
            extensions={[cpp()]}
            onChange={onChange}
          />
          <Button className="submit" onClick={submitCode}>
            提交代码
          </Button>
        </div>
      </>
    );
  } else if (seleted === "javascript") {
    return (
      <>
        <Select
          defaultValue="cpp"
          style={{ width: 100 }}
          onChange={handleChange}
          options={[
            { value: "java", label: "java" },
            { value: "cpp", label: "cpp" },
            { value: "python", label: "python" },
            { value: "javascript", label: "javascript" },
          ]}
        />
        <div className="codeEditor">
          <CodeMirror
            value={code}
            height="300px"
            extensions={[javascript()]}
            onChange={onChange}
          />
          <Button className="submit" onClick={submitCode}>
            提交代码
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Select
          defaultValue="cpp"
          style={{ width: 100 }}
          onChange={handleChange}
          options={[
            { value: "java", label: "java" },
            { value: "cpp", label: "cpp" },
            { value: "python", label: "python" },
            { value: "javascript", label: "javascript" },
          ]}
        />
        <div className="codeEditor">
          <CodeMirror
            value={code}
            height="300px"
            extensions={[python()]}
            onChange={onChange}
          />
          <Button className="submit" onClick={submitCode}>
            提交代码
          </Button>
        </div>
      </>
    );
  }
}
export default CodeEditor;
