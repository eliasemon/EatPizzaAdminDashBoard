const dark = "#121212";
const white0 = "rgba(255,255,255, .00";
const white1 = "rgba(255,255,255, .05";
const white2 = "rgba(255,255,255, .07";
const white3 = "rgba(255,255,255, .08";
const white4 = "rgba(255,255,255, .09";
const white5 = "rgba(255,255,255, .11";
const white6 = "rgba(255,255,255, .12";
const white7 = "rgba(255,255,255, .14";
const white8 = "rgba(255,255,255, .15";
const white9 = "rgba(255,255,255, .16";

const Settings = () => {
  return (
    <div
      style={{
        backgroundColor: dark,
        height: "700px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "250px", height: "250px", backgroundColor: white0 }}>
        dp0
        <div
          style={{ width: "250px", height: "250px", backgroundColor: white1 }}
        >
          dp1{" "}
          <div
            style={{ width: "250px", height: "250px", backgroundColor: white2 }}
          >
            dp2
            <div
              style={{
                width: "250px",
                height: "250px",
                backgroundColor: white3,
              }}
            >
              dp3{" "}
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  backgroundColor: white4,
                }}
              >
                dp4{" "}
                <div
                  style={{
                    width: "250px",
                    height: "250px",
                    backgroundColor: white5,
                  }}
                >
                  dp5
                  <div
                    style={{
                      width: "250px",
                      height: "250px",
                      backgroundColor: white6,
                    }}
                  >
                    dp6{" "}
                    <div
                      style={{
                        width: "250px",
                        height: "250px",
                        backgroundColor: white7,
                      }}
                    >
                      dp7{" "}
                      <div
                        style={{
                          width: "250px",
                          height: "250px",
                          backgroundColor: white8,
                        }}
                      >
                        dp8{" "}
                        <div
                          style={{
                            width: "250px",
                            height: "250px",
                            backgroundColor: white9,
                          }}
                        >
                          dp9{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
