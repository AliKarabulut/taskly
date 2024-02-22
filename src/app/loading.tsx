const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-2.5">
      <div className="flex gap-2.5">
        <span className="animation-delay-100 h-5 w-5 animate-scale rounded-full bg-indigo-600 shadow-lg dark:bg-slate-900"></span>
        <span className="animation-delay-200 h-5 w-5 animate-scale rounded-full bg-indigo-600 shadow-lg dark:bg-slate-900"></span>
        <span className="animation-delay-300 h-5 w-5 animate-scale rounded-full bg-indigo-600 shadow-lg dark:bg-slate-900"></span>
      </div>
    </div>
  )
}

export default Loading
