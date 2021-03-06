# `git-issue` - automatically correlate issue branches and Redmine tickets

The `git-issue` command automates some of the process of creating and working
with issue branches using common FreshBooks conventions. It will work on
branches named

* `issue-1234`
* `issue-1234-some-description`

and will automatically create branches (tracking origin/master) as needed.

## Installation

To install this script, check out the source tree somewhere and add it to your
`$PATH`. Alternately, place the `git-issue` script (or a symlink to it) in a
directory that's already in your `$PATH`.

## Basic usage

To create a new issue branch or to switch back to an existing issue branch:

    $ git issue 12321
    Switched to a new branch 'issue-12321-invoice-update-change-the-status-from-paid-disputed-doesnt-result-in-error'
    Working on [API] #12321: [invoice.update] change the status from paid->disputed doesn't result in error

The automatically generated description is based on the Redmine ticket
subject. To override the description, supply it when running `git issue` to
create a branch:

    $ git issue 12321 disputed-status-on-update
    Switched to a new branch 'issue-12321-disputed-status-on-update'
    Working on [API] #12321: [invoice.update] change the status from paid->disputed doesn't result in error

`git issue` will detect existing issue branches and check them out, if they
already exist:

    $ git branch issue-12321-disputed-status-on-update origin/master
    $ git issue 12321
    Switched to branch 'issue-12321-disputed-status-on-update'
    Working on [API] #12321: [invoice.update] change the status from paid->disputed doesn't result in error

## Commit message hooks

`git-issue` can automatically populate your commit messages with Redmine
linking phrases. This operates through a `prepare-commit-msg` hook. You can
install the hook by running

    $ git issue --install

This will check whether you already have a `prepare-commit-msg` hook, and
rename it if necessary to `prepare-commit-msg.git-issue-chain`. The new
`prepare-commit-msg` hook will call the original hook after adding issue
links to the commit message.

If you prefer to manage hooks manually, you can add

    /Path/To/git-issue --prepare-commit-msg "$@"

to your existing hook.
