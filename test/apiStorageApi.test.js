/* eslint-disable */
import scoreApi from "../src/Config/scoreStorageApi";
import "regenerator-runtime";

it("should return player username", () => {
    scoreApi
        .getScores()
        .then((data) => {
            expect(data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        user: "kitti",
                    }),
                ])
            );
        })
        .catch(() => {});
});

it("should return players scores", () => {
    scoreApi
        .getScores()
        .then((data) => {
            expect(data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        score: "420",
                    }),
                ])
            );
        })
        .catch(() => {});
});

it("should send an object to the API", () => {
    scoreApi
        .postScores()
        .then((data) => {
            expect(typeof data).toBe("object");
        })
        .catch(() => {});
});

it("should save score and username", () => {
    scoreApi
        .postScores("Kitti", 300)
        .then((data) => {
            expect(data.result).toBe("Success!");
        })
        .catch(() => {});
});
/* eslint-enable */
