import React, { useEffect } from "react";
import { describe, expect, test } from "vitest";
import { render, waitFor } from "@testing-library/react";

import {
  ProfileContextProvider,
  useProfile,
} from "../src/components/context/user";

const TestComponent = () => {
  const { setUsername, profile } = useProfile();

  useEffect(() => {
    setUsername("test");
  }, []);

  return (
    <>
      <p data-testid="login">{profile?.login}</p>
    </>
  );
};

/**
 * Test the Profile Provider loads a user when given a username
 */
describe("<ProfileProvider />", () => {
  test("Provides context to children", async () => {
    const { getByTestId } = render(
      <ProfileContextProvider>
        <TestComponent />
      </ProfileContextProvider>
    );

    const login = getByTestId("login");
    await waitFor(() => {
      expect(login.textContent).toEqual("test");
    });
  });
});
