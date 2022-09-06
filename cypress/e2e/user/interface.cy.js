/// <reference types="cypress" />

describe("Git Guess - Find User", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5173/");
  });

  it("App loads", () => {
    cy.get("h3").should("have.text", "Git Guess");
  });

  it("Can enter username by pressing enter", () => {
    const username = "SFPink";
    cy.get("input[type=text").type(`${username}{enter}`);
    cy.get("input[type=text").should("have.value", username);
  });

  it("User data loaded", () => {
    const username = "SFPink";
    cy.get(".profile-panel h3").should("have.text", username);
  });
});

describe("Git Guess - Find User", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5173/");
  });

  it("App loads", () => {
    cy.get("h3").should("have.text", "Git Guess");
  });

  it("Can enter username by pressing clicking button", () => {
    const username = "SFPink";
    cy.get("input[type=text").type(`${username}`);
    cy.get("button[type=button").click();
    cy.get("input[type=text").should("have.value", username);
  });

  it("User data loaded", () => {
    const username = "SFPink";
    cy.get(".profile-panel h3").should("have.text", username);
  });
});

describe("Git Guess - User Not Found", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5173/");
  });

  it("App loads", () => {
    cy.get("h3").should("have.text", "Git Guess");
  });

  it("Can enter username", () => {
    const username = "userdoesnotexist-xxxx";
    cy.get("input[type=text").type(`${username}{enter}`);
    cy.get("input[type=text").should("have.value", username);
  });

  it("User not found", () => {
    const username = "userdoesnotexist-xxxx";
    cy.get("div[role='alert'] p.text-sm").should("have.text", "Not Found");
  });
});
