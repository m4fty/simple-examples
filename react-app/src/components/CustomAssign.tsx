import React, { useState } from "react";

function customAssign<T, U>(target: T, ...sources: U[]): T & U {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const to = Object(target) as T & U;

  sources.forEach((nextSource: any) => {
    if (nextSource != null) {
      // Copia propiedades propias enumerables
      Object.keys(nextSource).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
          (to as any)[key] = nextSource[key];
        }
      });

      // Copia símbolos propios enumerables
      Object.getOwnPropertySymbols(nextSource).forEach((sym) => {
        if (Object.prototype.propertyIsEnumerable.call(nextSource, sym)) {
          (to as any)[sym] = nextSource[sym];
        }
      });
    }
  });

  return to;
}

const CustomAssign = () => {
  const [targetValue, setTargetValue] = useState<string>(
    '{"name": "Laura", "age": 30}'
  );
  const [sourceValue, setSourceValue] = useState<string>(
    '{"age": 31, "city": "Barcelona"}'
  );
  const [assignedValue, setAssignedValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAssign = () => {
    setError("");
    try {
      const targetObject = JSON.parse(targetValue);
      const sourceObject = JSON.parse(sourceValue);

      const result = customAssign({}, targetObject, sourceObject);
      setAssignedValue(JSON.stringify(result, null, 2));
    } catch (e) {
      setError("Error al parsear los objetos: " + (e as Error).message);
      setAssignedValue("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Custom Object Assign</h2>
      <div>
        <h3>Objeto Target:</h3>
        <textarea
          rows={8}
          cols={50}
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
        />
      </div>
      <div>
        <h3>Objeto Source:</h3>
        <textarea
          rows={8}
          cols={50}
          value={sourceValue}
          onChange={(e) => setSourceValue(e.target.value)}
        />
      </div>
      <button onClick={handleAssign}>Assign</button>
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>{error}</strong>
        </div>
      )}
      {assignedValue && (
        <div style={{ marginTop: "10px" }}>
          <h3>Resultado:</h3>
          <pre>{assignedValue}</pre>
        </div>
      )}
    </div>
  );
};

export default CustomAssign;
