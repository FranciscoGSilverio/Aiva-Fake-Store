import Image from "next/image";
import { FC } from "react";

export const Sidebar: FC = () => {
  return (
    <section className="min-w-[252px] w-[252px] max-h-[100vh] h-screen flex flex-col">
      <div className="flex items-center justify-center h-[250px]">
        <Image
          src="/logo/aiva_logo.png"
          alt="AIVA Logo"
          width={45}
          height={45}
        />
        <span>AIVA</span>
      </div>
      <h2 className="text-3xl font-semibold text-center mt-5">Explore</h2>
      <div className="flex flex-col gap-15 h-full justify-center">
        <a className="text-base text-center font-normal">Products</a>
        <a className="text-base text-center font-normal">Story</a>
        <a className="text-base text-center font-normal">Manufacturing</a>
        <a className="text-base text-center font-normal">Packaging</a>
      </div>
    </section>
  );
};
