import React, { useState } from "react";

function deepEqual(a: any, b: any, visited = new WeakMap()): boolean {
  if (a === b) {
    return true;
  }

  if (
    a == null ||
    b == null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  if (visited.has(a)) {
    return visited.get(a) === b;
  }
  visited.set(a, b);

  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }
    // @ts-ignore
    if (!deepEqual(a[key], b[key], visited)) {
      return false;
    }
  }

  return true;
}

const DeepEqual = () => {
  const [objectAValue, setObjectAValue] = useState<string>(
    '{"name": "María", "age": 29}'
  );
  const [objectBValue, setObjectBValue] = useState<string>(
    '{"name": "María", "age": 29}'
  );
  const [areEqual, setAreEqual] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");

  const handleCompare = () => {
    setError("");
    try {
      const objectA = JSON.parse(objectAValue);
      const objectB = JSON.parse(objectBValue);

      const result = deepEqual(objectA, objectB);
      setAreEqual(result);
    } catch (e) {
      setError("Error al parsear los objetos: " + (e as Error).message);
      setAreEqual(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Custom Deep Equal</h2>
      <div>
        <h3>Objeto A:</h3>
        <textarea
          rows={8}
          cols={50}
          value={objectAValue}
          onChange={(e) => setObjectAValue(e.target.value)}
        />
      </div>
      <div>
        <h3>Objeto B:</h3>
        <textarea
          rows={8}
          cols={50}
          value={objectBValue}
          onChange={(e) => setObjectBValue(e.target.value)}
        />
      </div>
      <button onClick={handleCompare}>Comparar</button>
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>{error}</strong>
        </div>
      )}
      {areEqual !== null && (
        <div style={{ marginTop: "10px" }}>
          <h3>Resultado:</h3>
          <p>¿Son iguales? {areEqual ? "Sí" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default DeepEqual;
