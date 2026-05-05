import { EXAMPLES } from "../data";
import TabButton from "../components/TabButton";
import { useState } from "react";
import Section from "./Section";
import Tabs from "./Tabs";

export default function Examples() {
  let [selectedTopic, setSelectedTopic] = useState<string>("");

  const handleTabClick = (selectedButton: string) => {
    setSelectedTopic(selectedButton);
  };

  return (
    <Section title="Examples" id="examples">
      <Tabs
        buttons={
          <>
            {Object.keys(EXAMPLES).map((key) => (
              <TabButton
                key={key}
                onClick={() => handleTabClick(key)}
                isSelected={selectedTopic === key}
              >
                {EXAMPLES[key].title}
              </TabButton>
            ))}
          </>
        }
      >
        {selectedTopic ? (
          <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic]?.title}</h3>
            <p>{EXAMPLES[selectedTopic]?.description}</p>
            <pre>{EXAMPLES[selectedTopic]?.code}</pre>
          </div>
        ) : (
          <p>Please select a topic.</p>
        )}
      </Tabs>
    </Section>
  );
}
