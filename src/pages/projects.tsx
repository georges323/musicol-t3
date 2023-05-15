import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { createPortal } from "react-dom";
import { LoadingPage } from "~/components/loading";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

const CreateProjectModal = (props: { onClose: () => void }) => {
    console.log(`Creating modal ${props.onClose}`);
    return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create New Project
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={props.onClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={props.onClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={props.onClose}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export const Projects = () => {
    const [showModal, setShowModal] = useState(false);
    
    const { data, isLoading} = api.projects.getAll.useQuery();

    if (isLoading) return <LoadingPage />;

    if (!data || data.length == 0) return <div>No Projects</div>;

    return (
        <>
        <div className="flex h-screen justify-center p-5">
            <div className="h-full w-full md:max-w-2xl">
                <div className="flex gap-3">
                    <p className="text-3xl font-bold">
                        Projects
                    </p>
                    <button 
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-2 ease-linear transition-all duration-150"
                        type="button" 
                        onClick={() => setShowModal(true)}
                    >
                        Add
                    </button>
                    {showModal && <CreateProjectModal onClose={() => setShowModal(false)} />}

                </div>
                <div className="flex flex-col mt-8">
                    {[...data, ...data].map((project) =>(
                        <div key={project.id} className="text-xl border rounded-xl border-slate-900 py-6 px-4 my-2">
                            {project.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}