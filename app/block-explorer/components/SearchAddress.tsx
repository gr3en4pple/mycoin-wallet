'use client'
import { Input } from '@nextui-org/input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SearchAddress = () => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(`/block-explorer/address/${search}`)
        }}
      >
        <Input
          size="lg"
          label="Search address"
          variant="bordered"
          placeholder="Enter any address"
          isClearable
          value={search}
          onValueChange={(value) => {
            setSearch(value)
          }}
        />
      </form>
    </div>
  )
}

export default SearchAddress
