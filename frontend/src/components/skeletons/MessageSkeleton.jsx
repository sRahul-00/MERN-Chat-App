const MessageSkeleton = () => {
  return (
    <>
        <div className="flex items-center gap-3">
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-1">
                <div className="skeleton h-4 w-40"></div>
                <div className="skeleton h-4 w-40"></div>
            </div>
        </div>

        <div className="flex justify-end items-center gap-3">
            <div className="flex flex-col gap-1">
                <div className="skeleton h-4 w-40"></div>
            </div>

            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
        </div>
    </>
  )
}
export default MessageSkeleton