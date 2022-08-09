import { useRouter } from "next/router";
import Head from "next/head"; //renders the head of the HTML doc for SEO

export default function Car({ car }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>
          {car.color} {car.id}
        </title>
      </Head>
      <h1>Hello {id}</h1>
      <img src={car.image} width="300px" />
    </>
  );
}

/*
 ** SERVER SIDE RENDERING
 ** (render on request)
 */
export async function getServerSideProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();

  return {
    props: { car: data },
  };
}

// /*
// ** SERVER SIDE GENERATION
// ** (render on build)
// */
// // Tells Next.js to prerender the page
// export async function getStaticProps({ params }) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//   const data = await req.json();

//   return {
//     props: { car: data },
//   };
// }

// // Tells Next.js which dynamic ids to render
// export async function getStaticPaths() {
//   //get the ids to render from cars.json
//   const req = await fetch(`http://localhost:3000/cars.json`);
//   const data = await req.json();

//   const paths = data.map((car) => {
//     return { params: { id: car } };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }
