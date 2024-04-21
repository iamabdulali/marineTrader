// GoogleTranslate.js
import React, { useEffect, useState } from "react";

const GoogleTranslate = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    let script;
    if (!scriptLoaded) {
      script = document.createElement("script");
      script.src = "https://cdn.gtranslate.net/widgets/latest/dwf.js";
      script.defer = true;
      document.body.appendChild(script);
      setScriptLoaded(true);
    }

    return () => {
      // Cleanup function to remove the script when the component unmounts
      if (script && scriptLoaded) {
        document.body.removeChild(script);
        setScriptLoaded(false);
      }
    };
  }, [scriptLoaded]);

  return <div className="gtranslate_wrapper"></div>;
};

export default GoogleTranslate;
