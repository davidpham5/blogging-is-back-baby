---
title: Linear Search
date: 2025-01-11
source: A common sense guide to Data Structures and Algorithms
isBasedOn: Searching An Ordered Array
link: https://bookshop.org/a/9695/9781680507225
tags:
  - interview
  - prep
  - technical
  - ordered
  - arrays
---
Re-reading *Data Structures and Algorithms* by Jay Wengrow. A key comparative advantage to ordered arrays over classic arrays is that searching in them can end a loop early if certain conditions are met. Whereas classic arrays, a value can be anywhere in the array. You must inspect each element and hope that the best case is finding the value on the first element. Here's an example in Ruby from Wengrow:

```ruby
# write a linear search algorithm that searches for a value in an array.
# stop searching when the value is a) found or b) the end of comparisons are reached or c) value is not founded

def linear_search(arr, value)
  arr.each_with_index do |element, index|
    # found the element we are looking for. give index
    if element == value
      return index
    # reached the end of comparisons, e.g. 45 > 56. Will always be false. exit out of loop.
    elseif element > value
      break
    end
  end
  # no dice
  return nil
end


# test cases
arr = [3, 13, 45, 56, 86, 170, 1000]
puts linear_search(arr, 45) # 2
puts linear_search(arr, 170) # 5
puts linear_search(arr, 1) # nil
```

During the loop, the first check is if you find the value matches the element, tell me where it is (`index`). If the element is **not** greater than the value, e.g. 45 > 56 -- always false, then `break` the loop. If you don't find anything, give me back `nil`.

An ordered array has an important benefit over classic arrays, in that it can end a search early.