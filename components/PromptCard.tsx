"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { UserType } from "@models/user";
import { PromptType } from "@models/prompt";

interface PromptCardProps {
  post: PromptType;
  handleTagClick: any;
  handleEdit: any;
  handleDelete: any;
}

const PromptCard: React.FunctionComponent<PromptCardProps> = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/user/${post.creatorId}`);
      const userDatabase = await response.json();
      setUser(userDatabase);
    };
    fetchUser();
  }, [post]);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 4000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image src={user!.image} alt="user_image" width={40} height={40} className="rounded-full object-contain" />
        </div>

        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">{user!.username}</h3>
          <p className="font-inter text-sm text-gray-500">{user!.email}</p>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            width={12}
            height={12}
            alt="copy icon"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
    </div>
  );
};

export default PromptCard;
