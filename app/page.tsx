import Image from "next/image";

export default function Index() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Image
        src="/hiking-trail.jpg"
        layout="fill"
        objectFit="cover"
        alt="Hiking trail"
      />
    </div>
  );
}