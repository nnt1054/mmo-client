

class Node:

	def __init__(self, val):
		self.val = val
		self.next = None

	def __str__(self):
		str_val = []
		cur = self
		while(cur is not None):
			str_val.append(cur.val)
			cur = cur.next
		return str(str_val)

	def printList(self):
		cur = self
		while(cur is not None):
			print(cur.val)
			cur = cur.next

def main():

	# Build linked list w/1 - 5
	start = Node(1)
	cur = start
	for i in range(2, 6):
		cur.next = Node(i)
		cur = cur.next

	# Print linked list
	start.printList()
	print(start.next.next)

main()