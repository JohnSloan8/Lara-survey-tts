import { useCallback, useEffect, useState } from "react";

import "survey-react/modern.min.css";
// import 'survey-react/survey.min.css';
import { Survey, StylesManager, Model } from "survey-react";
import axios from "axios";

StylesManager.applyTheme("modern");

const basicJson = {
  elements: [
    {
      name: "FirstName",
      title: "Enter your first names:",
      type: "text"
    },
    {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }
  ]
};

function App() {
  const [surveyJSON, setSurveyJSON] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios(
      "https://api.surveyjs.io/public/Survey/getSurvey?surveyId=af7ca1cb-84ff-4005-a034-bd34ddd08c23"
    ).then((json) => {
      setSurveyJSON(json.data);
      survey = new Model(json.data);
      setLoading(false);
      //displaySurvey();
    });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  console.log("survey:", survey);

  // survey.focusFirstQuestionAutomatic = false;

  // const alertResults = useCallback((sender) => {
  //   const results = JSON.stringify(sender.data);
  //   alert(results);
  // }, []);

  //survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default App;
