<?php

namespace App\Repositories;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Collection;

class TodoRepository
{
    /**
     * 一覧取得
     *
     * @param int $userId
     * @return Collection
     */
    public function getByUserId(int $userId): Collection
    {
        return Todo::where('user_id', $userId)->get();
    }

    /**
     * 取得
     *
     * @param int $todoId
     * @return Todo|null
     */
    public function find(int $todoId): ?Todo
    {
        return Todo::find($todoId);
    }

    /**
     * 新規作成
     *
     * @param int $userId
     * @param array $param
     * @return Todo
     */
    public function create(int $userId, array $param): Todo
    {
        $todo = new Todo();
        $todo->user_id = $userId;
        $todo->title = $param['title'];
        $todo->description = $param['description'];
        $todo->status = $param['status'];
        $todo->save();

        return $todo;
    }

    /**
     * 更新
     *
     * @param int $todoId
     * @param array $param
     * @return Todo|null
     */
    public function update(int $todoId, array $param): ?Todo
    {
        $todo = Todo::find($todoId);
        if (!$todo) {
            return null;
        }
        $todo->update($param);

        return $this->find($todoId);
    }

    /**
     * 削除
     *
     * @param int $todoId
     * @return bool
     */
    public function delete(int $todoId): bool
    {
        $todo = Todo::find($todoId);
        if (!$todo) {
            return false;
        }
        $todo->delete();

        return true;
    }
}
