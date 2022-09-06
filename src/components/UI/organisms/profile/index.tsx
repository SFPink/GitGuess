import React from "react";
import { useProfile } from "../../../context/user";
import Avatar, { Sizes } from "../../atoms/avatar";

export default function ProfilePanel() {
  const { profile } = useProfile();

  if (!profile) return false;

  return (
    <div className="py-5 flex profile-panel">
      <Avatar size={Sizes.med} url={profile.avatar_url} />
      <div className="px-5">
        <h3 className="font-bold leading-7 italic  text-gray-600 sm:truncate text-lg sm:tracking-tight">
          {profile.login}
        </h3>
        <p>{profile.bio ?? "User does not have a bio to display."}</p>
      </div>
    </div>
  );
}
