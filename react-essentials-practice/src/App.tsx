import { useState } from "react";
import Header from "./components/Header/Header";
import NumberInputField from "./components/InputField/NumberInputField";
import InputGroup from "./components/InputGroup/InputGroup";
import ResultTable, {
  type TableData,
} from "./components/ResultTable/ResultTable";
import {
  calculateInvestmentResults,
  formatter,
  type AnnualData,
  type InvestmentDto,
} from "./util/investment";

const INITIAL_INVESTMENT_CONFIG: InvestmentDto = {
  initialInvestment: 15000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

const TABLE_COLUMNS = [
  "Year",
  "Investment Value",
  "Interest (Year)",
  "Total Interest",
  "Invested Capital",
];

const deriveTableData = (investmentConfig: InvestmentDto): TableData => {
  const annualData: AnnualData[] = calculateInvestmentResults(investmentConfig);
  let compoundingInterest = 0;
  const tableData = annualData.map((data) => {
    const tableData = [];
    tableData.push(data.year);
    tableData.push(formatter.format(data.valueEndOfYear));
    tableData.push(formatter.format(data.interest));
    compoundingInterest += data.interest;
    tableData.push(formatter.format(compoundingInterest));
    tableData.push(formatter.format(data.valueEndOfYear - compoundingInterest));
    return tableData;
  });
  return {
    columns: TABLE_COLUMNS,
    data: [...tableData],
  };
};

function App() {
  const [investmentConfig, setInvestmentConfig] = useState<InvestmentDto>(
    INITIAL_INVESTMENT_CONFIG,
  );
  const inputIsValid = investmentConfig.duration >= 1;

  const tableData: TableData = inputIsValid
    ? deriveTableData(investmentConfig)
    : { columns: TABLE_COLUMNS, data: [] };

  const handleConfigChange = (field: string, newValue: number): void => {
    setInvestmentConfig((oldConfig) => {
      return {
        ...oldConfig,
        [field]: newValue,
      };
    });
  };

  return (
    <>
      <Header />
      <section id="user-input">
        <InputGroup>
          <NumberInputField
            labelText="Initial Investment"
            name="initial-investment"
            initialValue={INITIAL_INVESTMENT_CONFIG.initialInvestment}
            valueChangeCallback={(newValue: number) =>
              handleConfigChange("initialInvestment", newValue)
            }
            required
          />
          <NumberInputField
            labelText="Annual Investment"
            name="annual-investment"
            initialValue={INITIAL_INVESTMENT_CONFIG.annualInvestment}
            valueChangeCallback={(newValue: number) =>
              handleConfigChange("annualInvestment", newValue)
            }
            required
          />
        </InputGroup>
        <InputGroup>
          <NumberInputField
            labelText="Expected Return (%)"
            name="expected-return"
            initialValue={INITIAL_INVESTMENT_CONFIG.expectedReturn}
            valueChangeCallback={(newValue: number) =>
              handleConfigChange("expectedReturn", newValue)
            }
            required
          />
          <NumberInputField
            labelText="Duration (Years)"
            name="duration"
            initialValue={INITIAL_INVESTMENT_CONFIG.duration}
            valueChangeCallback={(newValue: number) =>
              handleConfigChange("duration", newValue)
            }
            required
          />
        </InputGroup>
      </section>
      {inputIsValid && <ResultTable tableData={tableData} />}
      {!inputIsValid && <p>Please input a positive integer for duration</p>}
    </>
  );
}

export default App;
