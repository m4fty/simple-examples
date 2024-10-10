import React, { useState } from "react";

function customStringify(value: any): string | undefined {
  const seen = new WeakSet<object>();

  function stringify(value: any): string | undefined {
    if (value === null) {
      return "null";
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }

    if (typeof value === "string") {
      return '"' + value.replace(/"/g, '\\"') + '"';
    }

    if (Array.isArray(value)) {
      const res = value.map((item) => stringify(item) || "null");
      return "[" + res.join(",") + "]";
    }

    if (typeof value === "object") {
      if (seen.has(value)) {
        throw new TypeError("Converting circular structure to JSON");
      }
      seen.add(value);

      const keys = Object.keys(value);
      const res = keys
        .map((key) => {
          const val = stringify(value[key]);
          if (val !== undefined) {
            return '"' + key + '":' + val;
          }
          return "";
        })
        .filter((item) => item.length > 0);
      return "{" + res.join(",") + "}";
    }

    return undefined;
  }

  return stringify(value);
}

const CustomStringify = () => {
  const [inputValue, setInputValue] = useState<string>(
    '{"name": "Ana", "age": 28}'
  );
  const [stringifiedValue, setStringifiedValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleStringify = () => {
    setError("");
    try {
      const parsedValue = JSON.parse(inputValue);
      const result = customStringify(parsedValue);
      setStringifiedValue(result || "");
    } catch (e: any) {
      setError("Error al parsear el objeto: " + e.message);
      setStringifiedValue("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Custom JSON Stringify</h2>
      <p>Ingresa un objeto en formato JSON:</p>
      <textarea
        rows={10}
        cols={50}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <br />
      <button onClick={handleStringify}>Stringify</button>
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>{error}</strong>
        </div>
      )}
      {stringifiedValue && (
        <div style={{ marginTop: "10px" }}>
          <h3>Resultado:</h3>
          <pre>{stringifiedValue}</pre>
        </div>
      )}
    </div>
  );
};

export default CustomStringify;
